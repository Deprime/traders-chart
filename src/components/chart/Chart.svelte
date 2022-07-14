<script lang="ts">
  import './Chart.scss'

  import { onMount, afterUpdate } from "svelte";
  import { fade } from 'svelte/transition';
  import { Chart, LineSeries } from "svelte-lightweight-charts";

  // Components
  import { Button, TraderCard } from '@/components';
  import ChartHeader from './ChartHeader.svelte';

  // Types
  import type { Trader } from './types/trader.ts';

  const MOBILE_BREAKPOINT = 1180;

  // Props
  export let trader: Trader;
  export let height = 275;
  let width = 800;

  // Data
  const localization = {locale: "en-US"};
  let syntheticDates = [];
  let chartApi;
  let loading = true;
  let componentWidth;
  const gridOptions = {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  }

  // Computed
  $: onResize(componentWidth);
  $: isMobile = checkIsMobile(componentWidth);

  // Methods
  const checkIsMobile = (w) => document.body.clientWidth < MOBILE_BREAKPOINT;

  /**
   * Generate synthetic dates
   */
  const generateSyntheticDates = async () => {
    const date = new Date("2019-04-01");
    const data = [];
    while (date.getMonth() <= 5) {
      data.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return data;
  }

  /**
   * Get chart data
   */
  const getTraderChartData = () => {
    if (!trader?.chart)
      return [];

    return trader.chart
      .map((value, i) => {
        const date  = syntheticDates[i+1];
        const day   = date.getDate().toString().padStart(2, '0');
        const month = date.getMonth().toString().padStart(2, '0');
        return {time: `2019-${month}-${day}`, value: (value > 0) ? value : (value + 1)};
      });
  }

  /**
   * On resize
   */
  const onResize = (w = null) => {
    width = (w) ? w - 14 : width;
    setTimeout(() => {
      chartApi.timeScale().fitContent();
    }, 10);
  }

  afterUpdate(() => {
    onResize();
	});

  onMount(async () => {
    loading = true;
    syntheticDates = await generateSyntheticDates();
    onResize();
    loading = false;
  })
</script>

{#if !loading}
  <section transition:fade bind:clientWidth={componentWidth}>
    <ChartHeader {trader} />

    {#key trader.capital}
      <div class="chart-data">
        <Chart
          {width}
          {height}
          {localization}
          ref={(ref) => chartApi = ref}
          grid={gridOptions}
          rightPriceScale={{visible: !isMobile}}
          leftPriceScale={{visible: false}}
        >
          <LineSeries
            data={getTraderChartData()}
            color="#8A24F3"
          />
        </Chart>
      </div>
    {/key}

    <div class="mobile-action">
      <Button block>
        Copy Now
      </Button>
    </div>
  </section>
{/if}
