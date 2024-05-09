
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    export let data;
    
    let searchterm = '';
    let yes = false;
 
    $:filteredclassmates = data.classmates.filter(
        (c)=>c.fullname.toLowerCase().includes(searchterm.toLowerCase()) 
    || c.coursename.toLowerCase().includes(searchterm.toLowerCase()))
</script>



<h1> CLASSMATES</h1>

<div>
    Search: 
    <input bind:value={searchterm}>
  
</div>



<DataTable style = "font-family:monospace; font-size: 1.5em;">
    <Head>
        <br>
        <Row>
            <Cell style="padding-right:50px;">Name</Cell>
            <Cell style="padding-right:50px;"> Rating </Cell>
            <Cell style="padding-right:50px;"> Shared course(s) </Cell>
            <Cell style="padding-left:50px;"> Friend </Cell>
        </Row>
    </Head>
    <Body>
        {#each filteredclassmates as classmate}
            <Row>
                <Cell style="padding-right:50px;"><a href="/person/{classmate.id}">{classmate.fullname}</a></Cell>
                <Cell style = "color:blue;">  
                    {#if classmate.average_rating}
                    {classmate.average_rating}/5
                    {:else} --
                    {/if}</Cell>
                <Cell>
                        {classmate.coursename}<br>
                </Cell>
                <Cell style="padding-left:50px;">
                    <div class="check">
                    {#if classmate.friendstatus}
                        <input type="checkbox" class="checkbox" checked disabled>
                    {:else}
                        <input type="checkbox" class="checkbox" disabled>
                    {/if}
                </div>
                </Cell>
            </Row>
        {/each}
    </Body>
</DataTable>


<style>
    .check{
      display:flex;
      align-items: center;
      justify-content: center;
    }
    .checkbox:checked {
 
        filter: brightness(0.1);
    }
</style>