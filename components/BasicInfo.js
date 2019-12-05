
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Style from '../components/Style';

const formatDate = (dateString) => {
  const d = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString(undefined, options);
}

const Icon = (props) => {

  if(!props.location) {
    return (
      <div>
        <div className="icon-group">
          <span className="basic-data"><FontAwesomeIcon icon={faCalendarAlt} /> Joined { props.formated_date }</span>
        </div>
      </div>
    )
  }

  else {
    return (
      <div>
        <div className="icon-group">
          <span className="basic-data"><FontAwesomeIcon icon={faMapMarkerAlt} /> { props.location }</span>
        </div>
        <div className="icon-group">
          <span className="basic-data"><FontAwesomeIcon icon={faCalendarAlt} /> Joined { props.formated_date }</span>
        </div>
      </div>
    )
  }
  
}


const BasicInfo = (props) => {

    const { avatar_url, name, html_url, login, location, created_at, followers, following, public_repos } = props.data;
    const formated_date = formatDate(created_at);
    return (
        <div>  
            <div className="container-fluid basic-info">
                <div className="row">
                  <div className="col-md-12" align="center">
                    <img src= { avatar_url } className="avatar"/>
                    <h1 className="name">
                      { name }
                    </h1>
                    <h3>
                      <a href={ html_url } className="login">@{login}</a>
                    </h3>
                    <Icon location={ location } formated_date = { formated_date }/>

                    <div className="group">
                      <div className="basic-stat">
                          <span className="number">{ followers }</span>
                          <br></br>
                          <span>Followers</span>
                      </div>
                      <div className="basic-stat">
                        <span className="number">{ public_repos }</span>
                        <br></br>
                        <span>Repositories</span>
                      </div>
                      <div className="basic-stat">
                        <span className="number">{ following }</span>
                        <br></br>
                        <span>Following</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div> 
            <Style />
        </div>
    )
}


export default BasicInfo;