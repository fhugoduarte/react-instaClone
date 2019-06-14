import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    const { image, author, place, description, hashtags } = this.state;

    e.preventDefault();

    try {
      const data = new FormData();
      data.append("image", image);
      data.append("author", author);
      data.append("place", place);
      data.append("description", description);
      data.append("hashtags", hashtags);
      const resp = await api.post("posts", data);
      console.log(`resp`, resp);
      this.props.history.push("/");
    } catch (e) {
      console.log(`error`, e);
    }
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
