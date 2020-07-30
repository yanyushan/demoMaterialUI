import React, {Component} from 'react';
import axios from 'axios'
import './App.css'
import ItemTable from "./components/itemTable";
import Filter from "./components/filter";
import Form from "./components/form";
import Button from "@material-ui/core/Button";

//定义组件
class App extends Component {
//初始化状态
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: '',
                name: ''
            }]
        }
    }

    render() {
        console.log('Render App')
        return (
            <div className="container-fluid" style={{marginTop: '20px'}}>
                <div className="row">
                    {/*信息表格*/}
                    <ItemTable
                        list={this.state.list}
                        deleteItem={this.deleteItem}
                        changeItem={this.changeItem}
                    />
                    <Form myform={this.myForm}/>
                    <Filter myfilter={this.myFilter}/>
                </div>

            </div>
        );
    }

//
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

    //修改
    changeItem = (item) => {
        axios.post(`/user/post`, {id: item.id, name: item.name}).then(({data}) => {
            console.log(data);
            let rowData = this.state.list;
            for (let i in rowData) {
                let unit = rowData[i]
                if (unit.id === item.id) {
                    console.log("change")
                    rowData[i].name = item.name
                }
            }
            this.setState({list: rowData});
        })
    };

    //删除
    deleteItem = (item) => {
        axios.get(`/user/delete`, {params: {id: item.id}}).then(({data}) => {
            console.log(data);
            let rowData = this.state.list;
            for (let i in rowData) {
                let unit = rowData[i];
                if (unit.id === item.id) {
                    console.log("delete")
                    delete rowData[i];
                }
            }
            this.setState({list: rowData});
        })
    };

    //提交
    myForm = (name) => {

        // 添加到comments中, 更新state
        let items = this.state.list
        let length =items.length
        items[length]={id:length,name: name}
        //items.unshift(item)
        this.setState({list:items})
    }

    myFilter = (list) => {
        this.setState({list})
    }
}

export default App;
