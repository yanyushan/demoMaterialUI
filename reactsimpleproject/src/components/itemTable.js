import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";

class ItemTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeable: false
        }
        this.changeInfo = this.changeInfo.bind(this)
        this.deleteInfo = this.deleteInfo.bind(this)
    }

    changeInfo(event, item) {
        let context = event.target.innerHTML
        if (window.confirm(`确定修改为"${context}"吗?`)) {
            item.name = context;
        }
        this.setState({changeable: false})
        this.props.changeItem(item)
    }

    deleteInfo(item) {
        if (window.confirm(`确定删除"${item.name}"的信息吗?`)) {
            this.props.deleteItem(item)
        }
    }

    render() {
        let list = this.props.list

        console.log('Render itemTable')
        return (
            <div className="col-xs-4 col-xs-offset-1">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !!list && list.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td suppressContentEditableWarning
                                        contentEditable={this.state.changeable}
                                        onBlur={event => {
                                            this.changeInfo(event, item)
                                        }}
                                    >{item.name}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                this.setState({changeable: true})
                                            }}
                                        >修改
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{marginLeft: '5px'}}
                                            onClick={() => {
                                                this.deleteInfo(item)
                                            }
                                            }
                                        >删除
                                        </Button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

ItemTable.propTypes = {
    list: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired
}

export default ItemTable