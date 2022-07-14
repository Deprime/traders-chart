<script lang="ts">
  import './reset.css'
  import './fonts.css'
  import './App.scss'

  import { onMount } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import { slide, fade } from 'svelte/transition';

  import TouchHandler from './components/tools/touch';

  // Components
  import { Chart, TraderCard, MobilePagionation } from './components';

  // Types
  import type { Trader } from './types/trader';

  const DATA_URL = 'https://api.jsonbin.io/v3/b/62cf0a1f4d5b061b1b4ca719';

  // Data
  let bestTraders: Trader[] = [];
  let selectedTrader: Trader = null;
  let selectedIndex = 0;
  let loading = true;
  const touchHandler = new TouchHandler();

  /**
   * Fetch traders data
   */
  const fetchTradersData = async (): Promise<any> => {
    try {
      const response = await fetch(DATA_URL);
      const data = await response.json();
      const { record } = data;
      return record;
    }
    catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Get random traders
   */
  const getRandomTraders = (traders: Trader[]): Trader[] => {
    const list: number[] = [];
    const max = traders.length - 1;
    const randomTraders = [];
    let i = 0;

    while (i < 4) {
      const index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      if (!list.includes(index)) {
        list.push(index);
        randomTraders.push(traders[index]);
        i++;
      }
    }

    return randomTraders;
  }

  /**
   * Set selected trader
   */
  const setSelectedTrader = (trader: Trader, index: number): void => {
    selectedTrader = trader;
    selectedIndex = index;
  }

  /**
   * Swipe handler
   */
  const onTouchStart = (event: CustomEvent) => {
    touchHandler.handleTouchStart(event);
  }

  /**
   * Swipe handler
   */
  const onTouchEnd = (event: CustomEvent): void => {
    const direction = touchHandler.handleTouchEnd(event);
    if (direction) {
      const total = bestTraders.length - 1;
      let nextIndex = null
      if (direction === "left") {
        nextIndex = (selectedIndex + 1 > total) ? 0 : selectedIndex + 1;
      }
      if (direction === "right") {
        nextIndex = (selectedIndex - 1 < 0) ? total : selectedIndex - 1;
      }
      if (typeof nextIndex === "number") {
        selectedIndex  = nextIndex;
        selectedTrader = bestTraders[nextIndex];
      }
    }
  }

  onMount(async () => {
    loading = true;
    try {
      const traders  = await fetchTradersData();
      bestTraders    = getRandomTraders(traders);
      selectedTrader = bestTraders[0];
    }
    catch (error) {
      throw new Error(error);
    }
    finally {
      loading = false;
    }

    // Touche event for mobile devices
    document.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchend', onTouchEnd, false);
  });
</script>

<div
  id="container"
  class="container"
>
  <main class="main">
    <header class="header">
      <h1>Copy the best masters</h1>
    </header>

    {#if !loading}
      <div transition:fade>
        <div class="content" transition:slide={{duration: 550, delay: 150, easing: quintOut}}>
          <aside class="aside">
            <ul class="trader-list">
              {#each bestTraders as trader, index}
                <li on:click={() => setSelectedTrader(trader, index)}>
                  <TraderCard
                    trader={trader}
                    order={index + 1}
                    selected={trader.name === selectedTrader.name}
                  />
                </li>
              {/each}
            </ul>
          </aside>
          <section class="chart">
            {#if selectedTrader}
              <Chart
                trader={selectedTrader}
              />
            {/if}
          </section>
        </div>
      </div>
    {/if}
  </main>

  <MobilePagionation
    pages={bestTraders}
    currentPage={selectedIndex}
  />
</div>
