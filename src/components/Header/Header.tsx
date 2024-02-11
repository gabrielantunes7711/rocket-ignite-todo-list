import styles from "./Header.module.css";
import logoSrc from "../../assets/logo.svg";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logoSrc} alt="Logo do site" />
    </header>
  );
};
