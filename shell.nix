with (import <nixpkgs> { });
let
  lib = stdenv.lib;
  buildPythonPackage = python3Packages.buildPythonPackage;

  libsass = buildPythonPackage rec {
    pname = "libsass";
    version = "0.20.0";

    src = fetchFromGitHub {
      owner = "sass";
      repo = "libsass-python";
      rev = version;
      sha256 = "0h9rj4k9izkfdvli8ip72bbvh6a7bvrv5pxz6zay2bq235gpfgfc";
    };

    buildInputs = [
      pkgs.libsass
    ];

    propagatedBuildInputs = [
      python3Packages.six
    ];

    preBuild = ''
      export SYSTEM_SASS=true;
    '';

    meta = with lib; {
      description = "A straightforward binding of libsass for Python. Compile Sass/SCSS in Python with no Ruby stack at all!";
      homepage = "https://sass.github.io/libsass-python/";
      license = licenses.mit;
      maintainers = with maintainers; [ SuperSandro2000 ];
    };
  };

  lektor-scss = buildPythonPackage rec {
    pname = "lektor-scss";

    version = "1.3.8";

    src = fetchFromGitHub {
      owner = "chaos-bodensee";
      repo = "lektor-scss";
      rev = version;
      sha256 = "1j5ikjxhg9d9cb4qdvqjdjr861i4ha7h3q52fk1q8wfpzkb451ds";
    };

    propagatedBuildInputs = [
      libsass
      python3Packages.termcolor
    ];

    postPatch = ''
      sed -i "s/libsass==0.20.0/libsass~=0.20.0/" setup.py
    '';

    meta = with lib; {
      description = "Lektor plugin to compile css out of sass - based on libsass";
      homepage = "https://pypi.org/project/lektor-scss/";
      license = licenses.mit;
      maintainers = with maintainers; [ SuperSandro2000 ];
    };
  };
in
mkShell {
  buildInputs = with pkgs.python3Packages; [
    lektor
    lektor-scss
    libsass
    pip
  ];
  shellHook = ''
    alias pip="PIP_PREFIX='$(pwd)/_build/pip_packages' \pip"
    export PYTHONPATH="$(pwd)/_build/pip_packages/lib/python3.8/site-packages:$PYTHONPATH"
    unset SOURCE_DATE_EPOCH
  '';
}
