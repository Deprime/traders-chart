<script lang="ts">
  import './Button.scss'

  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "@/components/tools/events";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let disabled = false;
  export let loading  = false;
  export let block    = false;
  export let variant  = "primary"; // ex type

  $: cssClassList = getCssClassList(variant, block, disabled, loading);

  // Methods
  const getCssClassList = (
    $$variant: string,
    $$block: boolean,
    $$disabled: boolean,
    $$loading: boolean
  ): string => {
    const list = [
      'button',
      `button-${$$variant}`,
      $$block && 'button-block',
      $$disabled && 'button-disabled',
      $$loading && 'button-loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<button
  use:events
  {...$$restProps}
  {disabled}
  class={cssClassList}
>
  <slot />
</button>
