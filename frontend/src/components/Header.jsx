import { Icon } from '@iconify/react';

const Header = () => {
    return (
        <nav className="flex justify-end items-center border p-6 bg-[#ececec] shadow-sm rounded-lg w-full h-16">
            <div className="flex space-x-4 mr-3">
                <Icon
                    icon="fe:bell"
                    width="20"
                    height="20"
                    className="text-[#1f104f] hover:text-[#00E1D4] cursor-pointer transition-colors"
                />
                <Icon
                    icon="fe:logout"
                    width="20"
                    height="20"
                    className="text-[#1f104f] hover:text-[#00E1D4] cursor-pointer transition-colors"
                />
            </div>
        </nav>
    );
}

export default Header;
