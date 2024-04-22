
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    export let data;
    
    let searchterm = '';
    
 
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
            <Cell style="padding-right: 50px;">Name</Cell>
            <Cell style="padding-right:50px;"> Rating </Cell>
            <Cell> Shared course(s) </Cell>
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
            </Row>
        {/each}
    </Body>
</DataTable>


