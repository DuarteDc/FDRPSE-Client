
import { useContext } from 'react';
import { Navbar as Nav, NavbarMenuToggle, NavbarContent, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { AuthContext } from '../../context/auth';
import { authService } from '../../../domain/services/auth.service';

interface Props {
    toggleDrawer: () => void;
    isOpen: boolean;
}
export const Navbar = ({ toggleDrawer, isOpen }: Props) => {

    const { startLogout } = authService();
    const { user } = useContext(AuthContext);

    return (
        <Nav
            isBordered
            isMenuOpen={isOpen}
            onMenuOpenChange={toggleDrawer}
            className="fixed"
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle aria-label={isOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>
            <NavbarContent justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="success"
                            name={`${user?.name} ${user?.lastName}`}
                            size="sm"
                            src={`https://ui-avatars.com/api?name=${user?.userName}&background=EAFAF5&`}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Conectado como</p>
                            <p className="font-semibold text-xs">{user?.userName}</p>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={startLogout}>
                            Cerrar Sesión
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Nav>
    )
}
