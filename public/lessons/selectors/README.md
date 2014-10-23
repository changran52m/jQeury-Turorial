# jQuery Selectors

## Basics
$('code')
$('#myid')
$('.myclass')
$('*')
$('code, #myid, .myclass')

## Hierarchy

$('div code')
$('li > ul')
$('strong + em')
$('strong ~ em')

## Basic Filters

$('li:first')
$('li:last')
$('li:not(li:first)')
$('li:even')
$('li:odd')
$('li:eq(1)')
$('li:gt(2)')
$('li:lt(2)')
$(':header')
$(':animated')

## Content Filters

$('li:contains(second-level)')
$(':empty')
$('li:has(a)')
$('p:parent')

## Visibility Filters

$(':hidden') //display none
$(':visible') //display not none

## Attribute Filters

$('li[class]')
$('a[xxx="self"]')
$('a[rel!="nofollow"]')
$('[class^="my"]')
$('[class$="my"]')
$('a[href*="zip"]')
$('a[rel][href][title="blog"]')

## Child Filters

$('li:first-child')
$('li:last-child')
$('li:nth-child(even)')
$('li:nth-child(odd)')
$('li:nth-child(2)')
$('li:nth-child(2n)')
$('code:only-child')

## Forms

$(':input')
$(':text')
$(':password')
$(':radio')
$(':checkbox')
$(':submit')
$(':image')
$(':reset')
$(':button')
$(':file')

## Form Filters

$('input:enabled')
$(':disabled')
$(':checked')
$(':selected')
