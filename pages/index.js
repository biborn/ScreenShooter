import React , { Component } from 'react'

import Layout from '../components/Layout.js'
import Link from 'next/link'
import axios from 'axios'


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { }
    }
    
    handleInput = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({[name]:value})
    }


    takeScreenShot = (url, device) => {
        console.log('screenshot')
        this.setState({loading:true}, () => {
            console.log('process.env.server', process.env.server)
            axios.get(`http://localhost:3000/screenshot?url=${url}&device=${device}`)
            .then((res)=> {
                console.log(res.data)
                this.setState({[device]:res.data.link}, () => {
                    this.setState({
                        showImage:true,
                        loading:false
                    })
                })
            })
            .catch(e => console.log(e))
        })

    }

    capture = (url) => {
        this.takeScreenShot(url, 'desktop');
        this.takeScreenShot(url, 'phone');
    }

    render() {
        return(
            <Layout>
                <div className='align-center'>
                    <div>
                        <p>
                            the API works by sending <code className='code'>GET</code> request to the server with <code>device</code> and <code>url</code> as query parameter.
                        </p>

                        <code className='code code-curl'>
                            curl https://screenshooterapi.herokuapp.com/screenshot?url=github.com&device=desktop
                        </code>
                        <br/>
                        <br/>
                        <p>
                            in response you will get a link to your screenshot and you'll be able to access the image in any time
                        </p>
                    </div>


                    <div className='response'>
      
                        <code>
                            &#123; 
                        </code>
                        <br/>
                        <code>
                            &emsp; &emsp; link:"https://screenshooterapi.herokuapp.com/getscreenshot/github-phone-1534523667970.png",
                        </code>
                        <br/>
                        <code>
                            &emsp; &emsp; name:"github-phone-1534523667970.png"                
                        </code>
                        <br/>
                        <code>
                            &#125; 
                        </code> 
                
                    </div>

                    <br/>

    
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">description</th>
                                <th scope="col">options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"><code>endpoint</code></th>
                                <td><code>https://screenshooterapi.herokuapp.com/screenshot?</code></td>
                                <td className='text-center'></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>url</code></th>
                                <td>the url of the site you want to take a screenshot of</td>
                                <td>any legal url</td>
                            </tr>
                            <tr>
                                <th scope="row"><code>device</code></th>
                                <td>the ratio of the screenshot</td>
                                <td><code>phone</code> / <code>desktop</code></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex-container center'>
                        <input onChange={this.handleInput} type='text' name='urlInput' className='url-input' placeholder='enter url'/>
                        <br/>
                        <button onClick={() => this.capture(this.state.urlInput)}>test it!!</button>
                        <br/>

                        {style}
                    </div>
                    <br/>
                    {
                        !this.state.loading ?
                        <div className='flex-container center'>
                            {this.state.showImage ? <img className='dsk-img' src={this.state.desktop}/> : null}
                            {this.state.showImage ? <img className='phone-img' src={this.state.phone}/> : null}
                        </div> : <p className='text-center'>one moment please(:...</p>
                    }

                </div>
            </Layout>
        )
    }
} 

Index.getInitialProps = async () => { // getInitialProps is a Next method to get props to be fetched to the page when its render
    return {}
}

const style = (
    <style jsx="true">
        {`
        .code-curl {
            margin:5px;
            padding:10px;
        }
        .response {
            background-color:#f5f5f5;
            border-radius:10px;
            padding:10px;
            margin:10px;
            width:100%;
        }

            .code { 
                background: #f5f5f5; 
                border-radius:10px;

            }
            pre {
                white-space: pre-wrap;
                background: hsl(30,80%,90%);
            }
            .align-center {
                margin-left:auto;
                margin-right:auto;
            }
            .flex-container {
                padding: 0;
                margin: 0;
                list-style: none;
                display: flex;
            }

            .url-input {
                width:300px;
            }

            .center { 
                justify-content: center; 
            }
            
            .dsk-img {
                width:auto;
                height:200px;
                margin-right:0.5rem
            }

            .phone-img {
                width:auto;
                height:200px;
                margin-left:0.5rem
            }
        `}
    </style>
)

export default Index