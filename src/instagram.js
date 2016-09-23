import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var Content = React.createClass({
    access_token: '2284247885.bb4f32a.47851f2fda564915bbae378c5d9710bb',
    getTags: function(){
        var url= 'https://api.instagram.com/v1/users/self/media/recent';
        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: {access_token: this.access_token},
            success: function(result){
                var tags = [];
                result.data.map(function(data){
                    tags = tags.concat(data.tags);
                });
                this.setState({tags: tags.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])});
                this.loadData();
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:' + xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    loadData: function(tag){
        var tags = this.state.tags;
        var random = Math.floor(Math.random() * tags.length);
        var tag = tag || tags[random];
        var url= 'https://api.instagram.com/v1/tags/'+ tag +'/media/recent';
        $.ajax({   
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            data: {access_token: this.access_token},
            success: function(result){
                this.setState({data: result.data, text: tag});
            }.bind(this),
            error:function(xhr, status, err){
                console.error('message:' + xhr.responseText);
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function(){
        return ({tags:[], data: [], text: ''});
    },
    componentDidMount: function(){
        this.getTags();
    },
    handlerSubmit: function(data){
        this.setState({text: data.text});
        this.loadData(data.text);
    },
    render: function(){
        return (
            <div className="content">
                <h3> 인스타그램에서 태그로 <strong>사진</strong> 찾기!</h3>
                <div className="search-result">
                    My tags : <MyTags onSubmit={this.handlerSubmit} text={this.state.text} tags={this.state.tags} />
                    Search: <SearchResult text={this.state.text} />
                </div>
                <SearchForm onSubmit={this.handlerSubmit} />
                <ImageList data={this.state.data}/>
            </div>
        );
    }
});

var MyTags = React.createClass({
    handlerClick: function(e){
        this.props.onSubmit({text: ReactDOM.findDOMNode(e.target).innerText});
    },
    render: function(){
        var handlerClick = this.handlerClick;
        var text = this.props.text;
        var tagNode = this.props.tags.map(function(data, index){
            var tag = (text === data) ? <strong>{data}</strong> : data;
            return <li className="list-inline-item" key={index} onClick={handlerClick}>{tag}</li>
        });
        return (
            <ul className="list-inline">
                {tagNode}
            </ul>
        );
    }
});

var SearchResult = React.createClass({
    render: function(){
        var text = this.props.text;
        return (
            <mark>{text}</mark>
        );
    }
});

var ImageList = React.createClass({
    render: function(){
        if(this.props.data.length === 0){
            return <div>No data..</div>
        }
        var ImageNode = this.props.data.map(function(result){
            var node = '';
            if('videos'in result){
                node = <video width="200" autoPlay>
                          <source src={result.videos.standard_resolution.url} type="video/mp4" />
                        </video>
            } else{
                node = <img src={result.images.thumbnail.url} />
            }
            return <li className="list-inline-item" key={result.id}>{node}</li>
        });
        return (
            <div className="image-list">
                <ul className="list-inline">
                    {ImageNode}
                </ul>
            </div>
        );
    }
});

var SearchForm = React.createClass({
    getInitialState: function(){
        return ({text: ''});
    },
    handlerTextChange: function(e){
        this.setState({text: e.target.value});
    },
    handlerSubmit: function(e){
        e.preventDefault();
        var text = this.state.text.trim();
        if(!text){
            return;
        }
        this.props.onSubmit({text: text});
        this.setState({text: ''});
    },
    render: function(){
        return (
            <form className="searchForm" onSubmit={this.handlerSubmit}>
                <input type="text" placeholder="Tag..."  
                    value={this.state.text}
                    onChange={this.handlerTextChange} />
                <input type="submit" value="Search" />
            </form>
        );
    }
});

export default Content; 
