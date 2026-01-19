const FormContainer = ({ children }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg shadow-md mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
