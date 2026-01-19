const Message = ({ variant, children }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'danger':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'success':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'warning':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'info':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className={`p-4 rounded border mb-4 ${getVariantClass()}`}>
            {children}
        </div>
    );
};

Message.defaultProps = {
    variant: 'info',
};

export default Message;
