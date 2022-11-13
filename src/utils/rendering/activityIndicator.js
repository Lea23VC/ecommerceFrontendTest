export function getActivityIndicator() {
  //search for thediv with .products class and replace the content with an activity indicator
  const element = document.querySelector(".products");
  element.innerHTML = `<div class="col-span-full flex justify-center">
    <div
      class="activity border-t-8 border-8 border-lightGrey border-t-pink w-[120px] h-[120px] rounded-full animate-spin justify-center"
    ></div>`;
}
