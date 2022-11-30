import { Link } from "react-router-dom";

function Gnb() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/user/list'>임직원 관리</Link>
        </li>
        <li>
          <Link to='/signout'>Sign out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Gnb;
