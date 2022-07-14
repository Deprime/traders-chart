<script lang="ts">
  import './TraderCard.scss';

  import { createEventDispatcher } from 'svelte/internal';

  // Types
  import type { Trader } from '@/types/trader';

  const dispatch = createEventDispatcher();

  // Props
  export let order: number;
  export let trader: Trader;
  export let selected = false;

  // Methods
  const onClick = (event: CustomEvent): void => {
    dispatch("click", event);
  }
</script>

<div class={`trader ${selected ? `trader-selected` : ``}`}>
  <figure
    class="flag"
    style={`background-image: url(${trader.flag})`}
  />
  <div class="summary">
    <h3 class="name">
      {order}. {trader.name}
    </h3>
    <div class="monthly-pofit">
      + {trader.monthly_profit}%
    </div>
  </div>
</div>
