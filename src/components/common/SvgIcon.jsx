import { ReactSVG } from 'react-svg';

export const SvgIcon = ({ src, ...props }) => {
    return <ReactSVG src={src} {...props} />;
};

