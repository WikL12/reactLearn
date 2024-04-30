import { Component} from 'react';
class ClassComponent extends Component {
    state={
        count:0
    }

    setCount=()=>{
        this.setState({
            count:this.state.count +1
        })
    }

    componentDidMount(): void {
        
    }
    componentWillUnmount(): void {
        
    }

    render(){
        return (<>
            <div></div>
        </>)
    }
}
export default ClassComponent