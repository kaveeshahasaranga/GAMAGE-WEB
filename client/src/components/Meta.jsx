import { Helmet } from 'react-helmet-async';

const Meta = ({ title = 'Welcome to Gamage Watch', description = 'We sell the best watches for cheap', keywords = 'electronics, buy electronics, cheap electroincs' }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    );
};

export default Meta;
