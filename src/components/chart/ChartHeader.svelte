<script lang="ts">
  // Components
  import { Button, TraderCard } from '@/components';

  // Types
  import type { Trader } from '@/types/trader';

  // Props
  export let trader: Trader;

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    signDisplay: "never",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Methods
  const formatCurrency = (value: number): string => {
    return formatter.format(value).replace(" $", "");
  }
</script>

<header class="chart-header">
  <TraderCard
    {trader}
    order={1}
  />
  <div class="stats-list noselect">
    <div class="stats-item stats-monthly-profit">
      <p>Monthly profit</p>
      {#if trader?.monthly_profit}
        <h4>
          {trader.monthly_profit} %
        </h4 >
      {/if}
    </div>
    <div class="stats-item stats-total-profit">
      <p>Total profit</p>
      {#if trader?.total_profit}
        <h4>
          {trader.total_profit} %
        </h4 >
      {/if}
    </div>
    <div class="stats-item stats-capital">
      <p>In management</p>
      {#if trader?.capital}
        <h4>
          {formatCurrency(trader.capital)} USD
        </h4 >
      {/if}
    </div>
  </div>
  <div class="action">
    <Button block>
      Copy Now
    </Button>
  </div>
</header>
