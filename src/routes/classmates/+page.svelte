
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    
    export let data;
    
</script>


<h1> Displayed all classmates with material UI !</h1>

<DataTable>
    <Head>
        <Row>
            <Cell>Name</Cell>
            <Cell>Rating</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.classmates as classmate}
            <Row>
                <Cell>{classmate.fullname}</Cell>
                <Cell>{#if classmate.average_rating}
                    {classmate.average_rating}
                {:else} no rating {/if}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>

