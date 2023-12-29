
import { useContext } from 'react';
import { Navbar as Nav, NavbarBrand, NavbarMenuToggle, NavbarContent, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { AuthContext } from '../../context/auth';

interface Props {
    toggleDrawer: () => void;
}
export const Navbar = ({ toggleDrawer }: Props) => {

    const { user } = useContext(AuthContext);

    return (
        <Nav
            isBordered
            className="fixed"
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle onPress={toggleDrawer} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
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
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Conectado como</p>
                            <p className="font-semibold">{user?.email}</p>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Nav>
    )
}
