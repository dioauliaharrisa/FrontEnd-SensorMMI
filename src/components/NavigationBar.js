export default function NavigationBar() {
  return (
    <div className="grid grid-cols-2 h-16 items-center bg-teal-600 text-white">
      <div className="flex">
        <img
          className="ml-8 mx-2 max-h-14 text-red-200"
          src="https://sakti.pusri.co.id/lucid/assets/images/img_logo_color.png"
        />
        {/* <div className="flex flex-col">
          <div className="text-lg font-bold">{"PUPUK SRIWIJAYA"}</div>
          <div className="text-lg font-bold">{"PALEMBANG"}</div>
        </div> */}
      </div>
      <div className="flex justify-self-end items-center h-full ">
        <div className="px-3">powered by</div>
        <div className="px-3">simbol disini</div>
        <div className="px-3">MUSA</div>
        <div className="bg-white h-full w-[0.45px]"></div>
        <div className="px-3">
          <img
            className="aspect-square rounded-full max-h-10 max-w-10"
            src="https://blog.hootsuite.com/wp-content/uploads/2021/07/free-stock-photos-03-620x413.jpeg.webp"
          ></img>
        </div>
        <div className="px-3">dioauliaharrisa</div>
        <div className="px-3 text-white">
          <i class="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
}
