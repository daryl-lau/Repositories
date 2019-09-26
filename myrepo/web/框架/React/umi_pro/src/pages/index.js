// import styles from './index.css';
import Link from 'umi/link'
import {Button} from "antd";

export default function() {
  return (
    <div>
      <div>INDEX</div>
      <Button><Link to={'/about'}>about</Link></Button>
      <Button><Link to={'/goods'}>goods</Link></Button>
    </div>
  );
}
