workflow "Deploy when push on master" {
  on = "push"
  resolves = ["GitHub Action for Zeit"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch master"
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters for GitHub Actions"]
  args = "--target production"
}
