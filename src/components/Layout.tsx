import { ComponentChildren, FunctionalComponent } from "preact";

interface LayoutProps {
    children: ComponentChildren;
    title?: string;
}

const Layout: FunctionalComponent<LayoutProps> = ({ children, title = "Triangles Game" }) => {
    return (
        <div class="setup-screen">
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default Layout;