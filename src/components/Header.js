import React, { Component } from 'react';
export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      filterItem: "all",
      loading: true,
      ipdatas: null
    };
  }
  componentDidMount() {
    this.fetchIpData();
  }

  updateFilter(e) {
    this.setState({ filterItem: e.target.textContent.toLowerCase() });
  }




  fetchIpData() {
    this.setState({ ipdatas: null });

    fetch("/getdata")//mingfucuiportfoliocount.herokuapp.com
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log("result");
          this.setState({ ipdatas: result });
        },
        (error) => {
          console.log(error);
          this.setState({ ipdatas: null });
        }
      );
  }




  render() {
    //let resumeData = this.props.resumeData;
    let filters = ["All"];
    const { ipdatas, filterItem } = this.state;

    let tbodyItemShow = [];
    if (ipdatas !== null) {
      tbodyItemShow = ipdatas.map((data, index) => (

        <tr className="row100 body" key={index}>
          <td className="cell100 column1">{index + 1}</td>
          <td className="cell100 column2">{data.app_name}</td>
          <td className="cell100 column3">{data.ip}</td>
          <td className="cell100 column4" style={{float: 'none'}}>{data.time}</td>
        </tr>
      ));
      console.log(tbodyItemShow);
    }
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.

    let filterItems = (
      filters.map(filter => {
        let filterClass = this.state.filterItem === filter.toLowerCase() ? (
          "filter-item-underlined") : ("filter-item");

        return (<span key={filter} onClick={this.updateFilter.bind(this)}
          className={filterClass}>
          {filter}
        </span>);
      })
    );

    let filterItemsWithSeparator = [];
    for (let i = 0; i < filterItems.length; i++) {
      if (i !== 0) { filterItemsWithSeparator.push(<span key={i}> / </span>); }
      filterItemsWithSeparator.push(filterItems[i]);
    }
    const divStyle1 = {
      left: '0px',
      bottom: '-581px'
    };
    const divStyle2 = {
      left: '0px', width: '0px'
    };
    const divStyle3 = {
      top: '581px', height: '585px', right: '5px'
    };
    const divStyle4 = {
      top: '292px', height: '293px'
    };

    console.log(filterItemsWithSeparator);    
    console.log('success');  
    return (
      
      <React.Fragment>
      
      <header id="home">
        <div className="projects-page">
          <h1 className="section-title">Login List</h1>

          <div className="filter-container">
            {filterItemsWithSeparator}
          </div>
          <div className="table100 ver1 m-b-110 full_width full_height">
            <div className="table100-body js-pscroll ps ps--active-y">
              <div>
                <table>
                  <thead>
                    <tr className="row100 head">
                      <th className="cell100 column1">No</th>
                      <th className="cell100 column2">App_name</th>
                      <th className="cell100 column3">IP_Address</th>
                      <th className="cell100 column4" style={{float: 'none'}}>Access_Time</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <table>
                <tbody>
                  {tbodyItemShow}
                </tbody>
              </table>
              <div className="ps__rail-x" style={divStyle1}><div className="ps__thumb-x" tabIndex="0" style={divStyle2}></div></div>
              <div className="ps__rail-y" style={divStyle3}><div className="ps__thumb-y" tabIndex="0" style={divStyle4}></div>
              </div>
            </div>
          </div>
        </div>


      </header>
      </React.Fragment>
    );
  }
}