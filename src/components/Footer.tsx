

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-10">
            <p className="text-sm">© {new Date().getFullYear()} Suyashaa Vaidya</p>
            <p className="text-sm mt-2">
                Email: <a href="mailto:suyashaa123@gmail.com" className="text-blue-400 hover:underline">suyashaa123@gmail.com</a> |
                Phone: <a href="tel:+9863481896" className="text-blue-400 hover:underline">+977 9863481896</a>
            </p>
            {/* <div className="flex justify-center gap-6 mt-4 text-2xl">
                <a href="https://github.com/Suyashaa14" target="_blank" className="hover:text-blue-400"><i className="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/suyashaa-vaidya-469779250/" target="_blank" className="hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
            </div> */}
        </footer>

    )
}

export default Footer