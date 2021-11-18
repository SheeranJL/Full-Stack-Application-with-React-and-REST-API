//Forbidden page component//
import {useHistory} from 'react-router-dom';

const Forbidden = () => {

  const history = useHistory();

  //function to return user to home page//
  const routeChange = () => {
    history.push('/');
  }

  return (
    <div class="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
        <button onClick={routeChange} className="button button-secondary">Return to home</button>
    </div>
  )
}

export default Forbidden;
