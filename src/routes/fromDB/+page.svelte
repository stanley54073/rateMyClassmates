
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    
    export let data;
    
</script>


<h1> Displayed all classmates with material UI !</h1>

<DataTable>
    <Head>
        <Row>
            <Cell>ID</Cell>
            <Cell>Email</Cell>
            <Cell>Full Name</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.classmates as classmate}
            <Row>
                <Cell>{classmate.id}</Cell>
                <Cell>{classmate.fullname}</Cell>
                <Cell>{classmate.email}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>


