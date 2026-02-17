import { BeatLoader } from "react-spinners";

export default function Loader() {
  return (
    <div style={styles.wrapper}>
      <BeatLoader color="#fc832c" size={15} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
};
