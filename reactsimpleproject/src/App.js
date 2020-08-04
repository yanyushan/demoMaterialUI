import React, {Component} from 'react';
import axios from 'axios'
import './App.css'

import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container';
import moment from 'moment';

//定义组件
class App extends Component {
//初始化状态
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: 'ID',
                    field: "id",
                    type: 'numeric',
                },
                {
                    title: 'Name',
                    field: "name",
                },
                {
                    title: 'Birthday',
                    field: "birthday",
                    type: 'date'
                },
            ],
            list: [
                {
                    id: '',
                    name: '',
                    birthday: '',
                },
            ],
        }
    }


    componentDidMount() {
        let self = this;
        setTimeout(function () {
            self.query();
        }, 600)

    }

    query = () => {
        axios.get('/user/query').then((responseData) => {
            this.setState({
                list: responseData.data.data
            });
        })
    };

    validRequest = (requestData) => {
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        return !!(requestData.name != null && requestData.name !== "" && moment(requestData.birthday).isBefore(now));
    }

    requestData = (rowData) => {
        return {
            head: {
                version: "HTTP/1.1",
                method: "POST"
            },
            msg: rowData,
        }
    }

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
                                if (this.validRequest(newData)) {
                                    let requestData = this.requestData(newData)
                                    axios.post(`/user/post`, {requestData}).then((responseData) => {
                                        if (responseData.data.code === 200) {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState((prevState) => {
                                                    const list = [...prevState.list];
                                                    list.push(newData);
                                                    return {...prevState, list};
                                                });
                                            }, 600);

                                        } else {
                                            resolve();
                                            alert("responseData.data.status+responseData.data.error")
                                            console.log(responseData.data.status + responseData.data.error)
                                        }
                                    })
                                } else {
                                    resolve();
                                    alert("Invalid Info")
                                }
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                if (this.validRequest(newData)) {
                                    let requestData = this.requestData(newData)
                                    axios.post(`/user/post`, {requestData}).then((responseData) => {
                                        if (responseData.data.code === 200) {
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
                                        } else {
                                            resolve();
                                            alert("Request faild!")
                                            console.log("Invalid response!")
                                        }
                                    })
                                } else {
                                    resolve();
                                    alert("Invalid Info")
                                }
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                let requestData = this.requestData(oldData)
                                axios.post(`/user/delete`, {requestData}).then((responseData) => {
                                    if (responseData.data.code === 200) {
                                        setTimeout(() => {
                                            resolve();
                                            this.setState((prevState) => {
                                                const list = [...prevState.list];
                                                list.splice(list.indexOf(oldData), 1);
                                                return {...prevState, list};
                                            });
                                        }, 600);
                                    } else {
                                        resolve();
                                        alert("Request faild!")
                                        console.log("Invalid response!")
                                    }
                                })
                            }),
                    }}
                />
            </Container>
        )
    }
}

export default App;
