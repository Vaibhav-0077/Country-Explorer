export const Header = ({search , setSearch}) =>{

    return(
        <header className="app-header">
            <div className="logo">
                <h2>Country-Explorer</h2>
            </div>

            <div className="header-search">
                <input
                type="text"
                placeholder="Search Country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </header>


        )
}