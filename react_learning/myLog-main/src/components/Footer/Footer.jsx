import { GoMarkGithub } from 'react-icons/go';
import { CgCopyright } from 'react-icons/cg';

const Footer = () => {
  return (
    <footer className="mt-10 flex flex-col items-center font-serif py-20">
      <p className="mb-3">
        <a
          className="flex items-center"
          href="https://github.com/hhnssl"
          target="_blank"
          rel="noreferrer"
        >
          <GoMarkGithub className=" mr-3" />
          <span>hhnssl.</span>
        </a>
      </p>
      <p className="flex items-center">
        <CgCopyright className=" mr-3" />
        <span>All rigths reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
