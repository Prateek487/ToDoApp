import classes from "./MyButton.module.css";
import Myform from "./MyForm";

const MyButton = (props) => {
  return (
    <div className={classes.Comp}>
      <Myform></Myform>
    </div>
  );
};
export default MyButton;
