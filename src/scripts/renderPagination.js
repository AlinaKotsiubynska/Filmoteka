function createPagination(pages, page) {
  if (pages < 2) {
    return '';
  }
  let str = '<ul class="pagination">';
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;

  // Show the Previous button only if you are on a page other than the first
  if (page > 1) {
    str += '<li class="page-item previous no"><a data-navigation="' + (page - 1) + '" class="page-link">←</a></li>';
  }
  // Show all the pagination elements if there are less than 6 pages total
  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page == p ? 'active' : 'no';
      str += '<li class="page-item ' + active + '"><a class="page-link" data-navigation="' + p + '">' + p + '</a></li>';
    }
  }
  // Use "..." to collapse pages outside of a certain range
  else {
    // Show the very first page followed by a "..." at the beginning of the
    // pagination section (after the Previous button)
    if (page > 2) {
      str += '<li class="no page-item"><a data-navigation="1" class="page-link">1</a></li>';
      if (page > 3) {
        str += '<li class="out-of-range"><a data-navigation="' + (page - 2) + '" class="page-link">...</a></li>';
      }
    }
    // Determine how many pages to show after the current page index
    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    // Determine how many pages to show before the current page index
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages - 1) {
      pageCutLow -= 1;
    }
    // Output the indexes for pages that fall inside the range of pageCutLow
    // and pageCutHigh
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
        continue;
      }
      active = page == p ? 'active' : 'no';
      str += '<li class="page-item ' + active + '"><a class="page-link" data-navigation="' + p + '">' + p + '</a></li>';
    }
    // Show the very last page preceded by a "..." at the end of the pagination
    // section (before the Next button)
    if (page < pages - 1) {
      if (page < pages - 2) {
        str += '<li class="out-of-range"><a data-navigation="' + (page + 2) + '"class="page-link">...</a></li>';
      }
      str += '<li class="page-item no"><a data-navigation="' + pages + '"class="page-link">' + pages + '</a></li>';
    }
  }
  // Show the Next button only if you are on a page other than the last
  if (page < pages) {
    str += '<li class="page-item next no"><a class="page-link" data-navigation="' + (page + 1) + '">→</a></li>';
  }
  str += '</ul>';
  // Return the pagination string to be outputted in the pug templates
  document.getElementById('pagination').innerHTML = str;
  return str;
}

export default function renderPagination(data) {
  document.getElementById('pagination').innerHTML = createPagination(data.total_pages, data.page);
}
