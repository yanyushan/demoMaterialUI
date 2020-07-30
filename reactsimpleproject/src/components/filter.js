import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
//import './component/ItemTable'
//import ItemTable from "./ItemTable";
//定义组件
class Filter extends Component {
//初始化状态

    constructor(props) {
        super(props);
        this.state = {
            lower: '',
            upper: '',

        }
    }


    render() {
        console.log('render filter')
        return(
            <div className="col-xs-3 col-xs-offset-1">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="lower" className="col-xs-3">From</label>
                        <div className="col-xs-8">
                            <input type="text" id="lower" className="form-control"  onChange={(e)=>{this.setState({lower:e.target.value})}}/>

                        </div>
                        <label htmlFor="upper" className="col-xs-3">To</label>
                        <div className="col-xs-8">
                            <input type="text" id="higher" className="form-control"  onChange={(e)=>{this.setState({upper:e.target.value})}}/>

                        </div>

                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-10">
                            <button className="btn btn-default" onClick={this.handleFilter}>筛选</button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
    handleFilter = (e) =>{
        e.preventDefault();
        if(this.state.lower !== '' && this.state.upper !== ''){
            axios.get('/user/filter',{params:{lower:this.state.lower,upper:this.state.upper}}).then((res)=>{
                console.log(res)
                let ans = res.data
                this.props.myfilter(ans)
                this.setState({
                    lower:'',
                    upper:''
                });


            })
        }


    };

}
Filter.propTypes={
    myfilter:PropTypes.func.isRequired
}
export default Filter;