
<script>
    
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    
    export let data;
    
    let classmates = [
        {id: 1, email: 'testlol@csu.fullerton.edu', fullname: 'John Doe' },
        {id: 2, email: 'hmm@csu.fullerton.edu', fullname: 'Jane Doe'}
    ];
</script>


<h1> Displayed with material UI !</h1>

<DataTable>
    <Head>
        <Row>
            <Cell>ID</Cell>
            <Cell>Email</Cell>
            <Cell>Full Name</Cell>
        </Row>
    </Head>
    <Body>
        {#each data.classmates as classmate (classmate.id)}
            <Row>
                <Cell>{classmate.id}</Cell>
                <Cell>{classmate.email}</Cell>
                <Cell>{classmate.fullname}</Cell>
            </Row>
        {/each}
    </Body>
</DataTable>


