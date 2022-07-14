<script lang="ts">
  import './MobilePagionation.scss'

  export let pages = [];
  export let currentPage = 0;
</script>

<div class="mobile-pagination">
  <div class="page-list">
    {#each pages as page, index}
      <span class={index === currentPage ? "current" : ""}></span>
    {/each}
  </div>
</div>
