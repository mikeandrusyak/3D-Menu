export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h2>3D-Menu</h2>
      </header>
      <main>{children}</main>
      <footer>
        <small>© 2024 3D-Menu</small>
      </footer>
    </div>
  );
} 