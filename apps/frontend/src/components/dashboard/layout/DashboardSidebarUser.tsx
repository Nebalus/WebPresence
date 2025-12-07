import {ChevronsUpDown, LogOut, Mail, Settings, History, HeartHandshake} from "lucide-react"
import {Avatar, AvatarFallback, AvatarImage,} from "@assets/components/shadcnui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@assets/components/shadcnui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from "@assets/components/shadcnui/sidebar"
import {NavLink} from "react-router-dom"
import {APP_DASHBOARD_PATH} from "@/constants.ts";
import {useAuthenticatedUserStore} from "@/stores/UserStore.ts";

export function NavUser() {
  const { user } = useAuthenticatedUserStore()
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user && <AvatarImage src="" alt={user.username} />}
                <AvatarFallback className="rounded-lg"><strong>?</strong></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user && (
                    <>
                      <span className="truncate font-semibold">{user.username}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user && <AvatarImage src="" alt={user.username} />}
                  <AvatarFallback className="rounded-lg"><strong>?</strong></AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {user && (
                      <>
                        <span className="truncate font-semibold">{user.username}</span>
                        <span className="truncate text-xs">{user.email}</span>
                      </>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <NavLink to={APP_DASHBOARD_PATH + "settings"}>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="mailto:support@nebalus.dev?subject=Help%20needed&body=Hello%20Support%2C%0AI%27m%20experiencing%20an%20issue%20and%20would%20appreciate%20your%20help.%0A-%20Description%3A%20%5BBrief%20issue%20description%5D%0A-%20Steps%20to%20Reproduce%3A%20%0A%20%201.%20%5BStep%201%5D%0A%20%202.%20%5BStep%202%5D%0A-%20Expected%20Result%3A%20%5BWhat%20should%20happen%5D%0A-%20Actual%20Result%3A%20%5BWhat%20happens%20instead%5D%0A-%20Device%2FOS%3A%20%5Be.g.%2C%20Windows%2010%2C%20macOS%5D%0A-%20Browser%20%28if%20applicable%29%3A%20%5Be.g.%2C%20Chrome%2C%20Firefox%5D%0A-%20Error%20Message%3A%20%5BAny%20error%20message%2C%20if%20applicable%5D%0A%0AAttachments%20%28if%20any%29%3A%20%5BScreenshots%2Ffiles%5D%0A%0AThanks%20for%20your%20assistance%21%0A%0ABest%2C%20%20%0A%5BYour%20Name%5D">
              <DropdownMenuItem>
                <HeartHandshake />
                Support
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="">
              <DropdownMenuItem>
                <Mail />
                Invitation Program
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="">
              <DropdownMenuItem>
                <History />
                Access History
              </DropdownMenuItem>
            </NavLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <NavLink to="/logout">
              <DropdownMenuItem>
                  <LogOut />
                  Log out
              </DropdownMenuItem>
            </NavLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
