<script>
    
    let buttonProps = {
        class:[$$restProps.class]

      
    }
    
    
</script>
    <button on:click
        on:mouseover
        on:mouseenter
        on:mouseleave
        on:focus
        {...buttonProps}> 
            <slot/>
    </button>

<style>
    .primary{
        color:blue;
        font-size:1em;
        padding:1em;
        
        /* center elements */
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        
    }
  
</style>
        