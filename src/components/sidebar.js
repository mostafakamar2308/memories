import heart from "../images/heart.svg";
export function SideBar() {
  return (
    <aside className="side-bar">
      <button>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 7H9V9H7V7Z" fill="currentColor" />
          <path d="M11 7H13V9H11V7Z" fill="currentColor" />
          <path d="M17 7H15V9H17V7Z" fill="currentColor" />
          <path d="M7 11H9V13H7V11Z" fill="currentColor" />
          <path d="M13 11H11V13H13V11Z" fill="currentColor" />
          <path d="M15 11H17V13H15V11Z" fill="currentColor" />
          <path d="M9 15H7V17H9V15Z" fill="currentColor" />
          <path d="M11 15H13V17H11V15Z" fill="currentColor" />
          <path d="M17 15H15V17H17V15Z" fill="currentColor" />
        </svg>{" "}
        All Memories
      </button>
      <button>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
            fill="currentColor"
          />
        </svg>{" "}
        Favorites
      </button>
    </aside>
  );
}
