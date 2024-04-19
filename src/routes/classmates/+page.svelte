
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    
    export let data;
    
</script>


<h1> CLASSMATES</h1>

<DataTable style = "font-family:monospace; font-size: 1.5em;">
    <Head>
        <Row>
            <Cell style="padding-right: 50px;">Name</Cell>
            <Cell> Rating </Cell>
        </Row>
    </Head>
    <Body>
        {#each data.classmates as classmate}
            <Row>
                <Cell style="padding-right:50px;"><a href="/person/{classmate.id}">{classmate.fullname}</a></Cell>
                <Cell style = "color:blue;">  
                    {#if classmate.average_rating}
                    {classmate.average_rating}/5
                    {:else} --
                    {/if}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>