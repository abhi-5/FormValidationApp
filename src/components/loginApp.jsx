import React, { Component } from 'react';

class LoginApp extends Component {
    state = { 
         customer : { name:'', age:'', email:'' },
         customers : [],
         codetype : 0,
         index : '',
         errors : {}
     }

     validate = () => {
        const errors = {};
        const { customer } = this.state;
        if(customer.name.trim() === ''){
            errors.name = 'Required, minimum 5 characters';
        }
        else if(customer.name.length < 5){
            errors.name = 'Required, minimum 5 characters';
        }

        if(customer.age.trim() === ''){
            errors.age = 'Required, should be a number greater than 20';
        }else if(customer.age < 21){
            errors.age = 'Required, should be a number greater than 20';
        }

        if(customer.email.trim() === ''){
            errors.email = 'Required, should have the character @ in it';
        }else if( !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(customer.email)){
            errors.email = 'Required, should have the character @ in it';
        }
 
        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleChange = ({ currentTarget: input}) => {
        const customer = {...this.state.customer};
        customer[input.name] = input.value;
        this.setState({ customer });
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors : errors || {} })
        if (errors) return;

        this.state.customers.push(this.state.customer)
        this.setState({ customers : this.state.customers })
        console.log(this.state.customers);
        this.setState({ 
            customer : this.state.customer = {} ,
            codetype : 0 
        })  
    }

    handleEdit = (data) => { 
        const index = this.state.customers.findIndex( val => val === data)
        const customers = [...this.state.customers];
        customers[index] = data;
        console.log(index) 
        this.setState({  
             index : index,
             customer : data ,
             codetype : 3 
        }); 
            console.log(this.state.index)
    } 

    handleUpdate = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors : errors || {} })
        if (errors) return;

        const index = this.state.index ;
        const customers = [...this.state.customers];
        customers[index] = this.state.customer;
        this.setState({customers });
        this.setState({ 
            customer : this.state.customer = {} ,
            codetype : 0 
        })
    }

     handleForm = () => {
         this.setState({codetype : 2})
     }

     handleList = () => {
         this.setState({codetype : 1})
         this.setState({arr : this.state.arr = []})
     }

     renderTable(){
         if(this.state.customers.length === 0) return <div><br/><h5>There are ZERO customers</h5></div>

            return(
                <div><br/>
                            <table class="table table-bordered table-sm">
                                    <thead style={{background: 'black',color:'white',textAlign: 'center'}}>
                                        <tr>
                                        <th scope="col" style={{width:'20%'}}>Name</th>
                                        <th scope="col" style={{width:'20%'}}>Age</th> 
                                        <th scope="col" style={{width:'20%'}}>Email</th>
                                        <th scope="col" style={{width:'20%'}}></th>
                                        </tr>
                                    </thead>
                                <tbody style={{textAlign: 'center'}}>
                                    
                                     {this.state.customers.map((data, i) => {       
                                        return( 
                                        <tr key={i}>
                                            <td> {data.name} </td>
                                            <td> {data.age}  </td>
                                            <td> {data.email} </td>
                                            <td> <button onClick={ () => this.handleEdit(data)} 
                                                className="btn btn-secondary btn-sm">Edit</button></td>
                                            </tr>
                                        );
                                    })  } 
                                </tbody>   
                            </table> 
                </div>
            )
     }
    
    
    render() { 
        const { customer, errors } = this.state;
        if(this.state.codetype === 0){
            return  <div className="container col-6 bg-info"><br/>
                    <button onClick={this.handleForm} className="btn btn-primary btn-sm mr-2">New Customers</button>
                    <button onClick={this.handleList} className="btn btn-primary btn-sm mr-2">List of Customers</button>                
                    <br/>
                    <h5>Welcome to the Customer System</h5>
                    <br/>
                </div>
         
        }else if(this.state.codetype === 1){
            return  <div className="container col-6 bg-info"><br/>
                    <button onClick={this.handleForm} className="btn btn-primary btn-sm mr-2">New Customers</button>
                    <button onClick={this.handleList} className="btn btn-primary btn-sm mr-2">List of Customers</button> <br/>               
                    <br/>
                    {this.renderTable()}
                    <br/>
                </div>
 
        }else if(this.state.codetype === 2){
            return  <div className="container col-6 bg-info"><br/>
                    <button onClick={this.handleForm} className="btn btn-primary btn-sm mr-2">New Customers</button>
                    <button onClick={this.handleList} className="btn btn-primary btn-sm mr-2">List of Customers</button>
                    
                    <form ref="myForm" className="myForm">
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                value={customer.name}
                                onChange={this.handleChange}  
                                name="name"
                                id="name" 
                                type="text" 
                                className="form-control" 
                            />
                            { errors.name && <div className="alert alert-danger">{errors.name}</div> }
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                value={customer.age}
                                onChange={this.handleChange}
                                name="age" 
                                id="age" 
                                type="number" 
                                className="form-control" 
                            />
                            { errors.age && <div className="alert alert-danger">{errors.age}</div> }
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={customer.email}
                                onChange={this.handleChange}
                                name="email" 
                                id="email" 
                                type="text" 
                                className="form-control" 
                            />
                            { errors.email && <div className="alert alert-danger">{errors.email}</div> }
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-sm">Submit</button>
                        
                    </form>
                    <br/>
                </div>           
             }else if(this.state.codetype === 3){
            return  <div className="container col-6 bg-info"><br/>
                    <button onClick={this.handleForm} className="btn btn-primary btn-sm mr-2">New Customers</button>
                    <button onClick={this.handleList} className="btn btn-primary btn-sm mr-2">List of Customers</button>
                    
                    <form ref="myForm" className="myForm">
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                value={customer.name}
                                onChange={this.handleChange}  
                                name="name"
                                id="name" 
                                type="text" 
                                className="form-control" 
                            />
                            { errors.name && <div className="alert alert-danger">{errors.name}</div> }
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                value={customer.age}
                                onChange={this.handleChange}
                                name="age" 
                                id="age" 
                                type="text" 
                                className="form-control" 
                            />
                            { errors.age && <div className="alert alert-danger">{errors.age}</div> }
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={customer.email}
                                onChange={this.handleChange}
                                name="email" 
                                id="email" 
                                type="text" 
                                className="form-control" 
                            />
                            { errors.email && <div className="alert alert-danger">{errors.email}</div> }
                        </div>
                        <button onClick={this.handleUpdate} className="btn btn-primary btn-sm">Submit</button>
                        <br/>
                    </form>
                </div>
        }
    }
}
 
export default LoginApp;