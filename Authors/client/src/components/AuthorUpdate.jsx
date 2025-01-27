import styles from './styles/styles.module.css'
import {Button} from "antd";

const AuthorUpdate = props => {
    return (
        <div className={styles.authorsTable}>
            <div className={styles.navContainer}>
                <a href="/authors">
                    <Button type="primary">Home</Button></a>
            </div>
            <h3>Edit this Author:</h3>
            <div className={styles.formContainer}>
                {props.children}
            </div>
        </div>
    )
}

export default AuthorUpdate