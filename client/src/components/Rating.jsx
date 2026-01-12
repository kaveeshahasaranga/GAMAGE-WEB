import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = '#C5A059' }) => { // #C5A059 is Omega Gold
    return (
        <div className="rating flex items-center gap-1 text-sm mb-2">
            <span style={{ color }}>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className="ml-2 text-gray-500 font-medium">{text && text}</span>
        </div>
    );
};

export default Rating;
