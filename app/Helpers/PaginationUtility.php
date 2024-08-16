<?php

namespace App\Helpers;

class PaginationHelper
{
    /**
     * Get the previous page number.
     *
     * @param int $currentPage
     * @param int $lastPage
     * @return int|null
     */
    public static function previousPageNumber(int $currentPage): ?int
    {
        return $currentPage > 1 ? $currentPage - 1 : null;
    }

    /**
     * Get the next page number.
     *
     * @param int $currentPage
     * @param int $lastPage
     * @return int|null
     */
    public static function nextPageNumber(int $currentPage, int $lastPage): ?int
    {
        return $currentPage < $lastPage ? $currentPage + 1 : null;
    }
}
