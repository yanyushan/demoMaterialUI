import React, {Component} from 'react';
import axios from 'axios'
import './App.css'

import moment from "moment";
import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';

//定义组件
class App extends Component {
//初始化状态
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'ID',
                    field: 'id',
                    type: 'numeric',
                },
                {
                    title: 'Name',
                    field: 'name',
                },
                {
                    title: 'Birthday',
                    field: 'birthday',
                    type: 'date'
                },
            ],
            list: [
                {
                    id: '',
                    name: '',
                },
            ],
        }
    }


    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.query();
        }, 500)

    }

    query = () => {
        axios.get('/user/query').then(({data}) => {
            this.setState({
                list: data
            });
        })
    };

    render() {
        return (
            <Container maxWidth="lg" h>
                <MaterialTable
                    title="User Information"
                    columns={this.state.columns}
                    data={this.state.list}
                    editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                let birthday= moment(newData.birthday).format('YYYY-MM-DD')
                                axios.post('/user/post', {id:newData.id,name:newData.name,birthday:birthday})
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const list = [...prevState.list];
                                        list.push(newData);
                                        return {...prevState, list};
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                let birthday= moment(newData.birthday).format('YYYY-MM-DD')
                                axios.post(`/user/post`, {id:newData.id,name:newData.name,birthday:birthday})
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState((prevState) => {
                                            const list = [...prevState.list];
                                            list[list.indexOf(oldData)] = newData;
                                            return {...prevState, list};
                                        });
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                oldData.birthday= moment(oldData.birthday).format('YYYY-MM-DD')
                                axios.get(`/user/delete`, {params: {id:oldData.id}})
                                setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const list = [...prevState.list];
                                        list.splice(list.indexOf(oldData), 1);
                                        return {...prevState, list};
                                    });
                                }, 600);
                            }),
                    }}
                />
            </Container>

        )
    }
}

export default App;
