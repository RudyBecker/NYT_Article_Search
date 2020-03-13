import React, { Component } from 'react';
import './App.css';
import { Jumbotron, Container, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

class App extends Component {
  constructor () {
    super()
    this.state = {
      search: "",
      articles: [],
      pubDate: ""
    }
  }
  search=()=> {
    this.getArticles(this.state.search)
  }

  handleChange=(e)=> {
    this.setState({search: e.target.value})
  }
  //
  // convertDate=(article)=> {
  //   let date = article;
  //   let newDate = Date(document.data.date).toString();
  //   this.setState({pubDate: newDate})
  // }

  getArticles=(query)=> {
    let apiKey = process.env.REACT_APP_NYT_KEY;
    let searchURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}=election&api-key=${apiKey}`;

    fetch(searchURL)
      .then((response) => {
        return response.json()
      })
      .then((payload) => {
        let articles = payload.response.docs;
        console.log(articles)
        this.setState({articles: articles})
      })
  }

  render() {
    return (
      <>
        <Jumbotron fluid>
         <Container fluid>
           <h1 className="display-3">New York Times Article Search</h1>
           <p className="lead">This is an educational API search project. Made by Meo & Rudy.</p>
         </Container>
       </Jumbotron>

       <InputGroup>
        <Input
          onChange={this.handleChange}
          type="text"
          value={this.state.search}
          placeholder="What articles would you like to see?"
        />
        <InputGroupAddon addonType="append">
          <Button onClick={this.search} color="secondary">Search</Button>
        </InputGroupAddon>
      </InputGroup>

      <div>
        {this.state.articles.map((article, index) => {
          return (
            <div key={index}>
              <a href={article.web_url} target="_blank">{index + 1}: {article.headline.main}</a>
              <p>{article.pub_date}</p>
            </div>
          )
        })}
      </div>
     </>
    )
  }

}

export default App;
